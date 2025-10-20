import {
  createDOMRenderer,
  RendererProvider,
  renderToStyleElements,
  SSRProvider,
} from '@fluentui/react-components';
import { createReadableStreamFromReadable } from '@react-router/node';
import { PassThrough } from 'node:stream';
import { renderToPipeableStream, renderToStaticMarkup } from 'react-dom/server';
import type { EntryContext } from 'react-router';
import { ServerRouter } from 'react-router';

export const STREAM_TIMEOUT = 5_000;

// Define constants for style injection
const FLUENT_UI_INSERTION_POINT_TAG = `<meta name="fluentui-insertion-point" content="fluentui-insertion-point"/>`;
const FLUENT_UI_INSERTION_TAG_REGEX = new RegExp(
  FLUENT_UI_INSERTION_POINT_TAG.replaceAll(' ', '(\\s)*')
);

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext
) {
  const renderer = createDOMRenderer();

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    // Track style extraction state
    let isStyleExtracted = false;

    const { pipe, abort } = renderToPipeableStream(
      // Wrap RemixServer with Fluent UI providers
      <RendererProvider renderer={renderer}>
        <SSRProvider>
          <ServerRouter context={routerContext} url={request.url} />,
        </SSRProvider>
      </RendererProvider>,
      {
        onShellReady() {
          responseHeaders.set('Content-Type', 'text/html');

          shellRendered = true;
          const body = new PassThrough({
            // Transform stream to inject Fluent UI styles
            transform(chunk, _, callback) {
              const str = chunk.toString();
              const style = renderToStaticMarkup(<>{renderToStyleElements(renderer)}</>);

              if (!isStyleExtracted && FLUENT_UI_INSERTION_TAG_REGEX.test(str)) {
                chunk = str.replace(
                  FLUENT_UI_INSERTION_TAG_REGEX,
                  `${FLUENT_UI_INSERTION_POINT_TAG}${style}`
                );
                isStyleExtracted = true;
              }

              callback(null, chunk);
            },
          });

          const stream = createReadableStreamFromReadable(body);

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    // Abort the rendering stream after the `streamTimeout` so it has time to
    // flush down the rejected boundaries
    setTimeout(abort, STREAM_TIMEOUT + 1000);
  });
}
