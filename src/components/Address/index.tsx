/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { useAppSelector } from '@/hooks/useAppDispatch';
import { zIndex } from '@/assets/style';

export function Address() {
  const contentHref = useAppSelector((state) => state.content.currentHref);

  const [currentUrl, setCurrentUrl] = useState<string>('');

  const myTabId = useRef<number>(-1);

  const isLocalhost = () => {
    return /http:\/\/(localhost|127.0.0.1):[0-9]*\/.*/.test(currentUrl);
  };

  const isSameUrl = () => {
    return currentUrl === contentHref;
  };

  useEffect(() => {
    /**
     * 현재 탭의 정보를 초기화
     * https://stackoverflow.com/questions/6718256/how-do-you-use-chrome-tabs-getcurrent-to-get-the-page-object-in-a-chrome-extensi
     */
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const { id, url } = tabs[0];

      setCurrentUrl(url || '');
      myTabId.current = id || -1;
    });

    /**
     * 탭이 업데이트 될 때 마다 url를 갱신
     * 단, 현재 탭의 업데이트에 대해서만 갱신
     */
    chrome.tabs.onUpdated.addListener((tabId, _, tab) => {
      if (myTabId.current !== tabId) {
        return;
      }

      setCurrentUrl(tab.url || '');
    });
  }, []);

  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        z-index: ${zIndex.addressTable};

        table {
          border-collapse: collapse;

          p {
            margin: 0;
          }

          th {
            background-color: lightgray;
          }
        }

        table,
        tr,
        th,
        td {
          border: 1px solid black;
          background-color: white;
        }
      `}
    >
      <table>
        <thead>
          <tr>
            <th></th>
            <th>url</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>current page</th>
            <td>
              <p
                css={css`
                  text-decoration: ${isLocalhost() ? 'line-through' : 'none'};
                `}
              >
                {currentUrl}
              </p>
            </td>
          </tr>
          <tr>
            <th>content source</th>
            <td>{contentHref}</td>
          </tr>
          <tr>
            <th>state</th>
            <td>
              {!isLocalhost() ? (
                <p>
                  <StateBullet type={'red'} /> Works only on localhost.
                </p>
              ) : !isSameUrl() ? (
                <p>
                  <StateBullet type={'orange'} /> A page refresh is required.
                </p>
              ) : (
                <p>
                  <StateBullet type={'green'} /> ok
                </p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function StateBullet({ type }: { type: 'red' | 'orange' | 'green' }) {
  return (
    <div
      css={css`
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background-color: ${type};
      `}
    />
  );
}
