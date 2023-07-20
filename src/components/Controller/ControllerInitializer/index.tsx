import React, { MutableRefObject } from 'react';
import { ControllerWrapper } from '@/components/Controller/ControllerWrapper';
import { setElementDefaultScale, setElementTopLeftPosition } from '@/utils/dom';
import { Button } from '@/components/Button';
import { MESSAGE_TYPE } from '@/constants';
import Fit from '@/assets/svg/fit.svg';
import Refresh from '@/assets/svg/refresh.svg';

interface Props {
  $target: MutableRefObject<HTMLDivElement | null>;
}

export function ControllerInitializer({ $target }: Props) {
  const handleFitButtonClick = () => {
    setElementTopLeftPosition($target.current);
    setElementDefaultScale($target.current);
  };

  const handleRefreshButtonClick = () => {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const [tab, ..._] = tabs;

        if (!tab || !tab.id) {
          return;
        }

        chrome.tabs.sendMessage(tab.id, {
          type: MESSAGE_TYPE.REQUEST_REFRESH_DATA,
        });
      });
    } catch (e) {
      /**
       * TODO: Extension context invalidated 에러 발생 시 적절한 처리가 필요.
       * 개발 모드에서만 발생하는 오류인지는 모르겠음.
       */
      console.error(e);
    }
  };

  return (
    <ControllerWrapper type={'rightBottom'}>
      <Button onClick={handleFitButtonClick}>
        <Fit />
      </Button>
      <Button onClick={handleRefreshButtonClick}>
        <Refresh />
      </Button>
    </ControllerWrapper>
  );
}
