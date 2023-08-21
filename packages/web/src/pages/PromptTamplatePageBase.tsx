import React, { useCallback, useEffect, useState } from 'react';
import { BaseProps } from '../@types/common';
import useChat from '../hooks/useChat';
import Card from '../components/Card';
import { PiChatCircleDotsFill } from 'react-icons/pi';
import Markdown from '../components/Markdown';
import InputChatContent from '../components/InputChatContent';
import ButtonCopy from '../components/ButtonCopy';
import ButtonFeedback from '../components/ButtonFeedback';
import Tooltip from '../components/Tooltip';
import SelectLlm from '../components/SelectLlm';
import useScroll from '../hooks/useScroll';

type Props = BaseProps & {
  title: string;
  systemContext: string;
  inputPromptComponent?: React.ReactNode;
  children: React.ReactNode;
};

const PromptTamplatePageBase: React.FC<Props> = (props) => {
  const { loading, chats, initChats, postChat } = useChat();
  const { scrollToBottom, scrollToTop } = useScroll();

  const [content, setContent] = useState('');

  const onSend = useCallback(() => {
    postChat(content);
    setContent('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  useEffect(() => {
    initChats(props.systemContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.systemContext]);

  useEffect(() => {
    if (chats.length > 0) {
      scrollToBottom();
    } else {
      scrollToTop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div
      className={`${props.className ?? ''} flex flex-col ${
        chats.length > 1 ? 'pb-32' : 'pb-16'
      }`}>
      <div className="grid grid-cols-12">
        <div className="invisible col-span-12 my-0 flex h-0 items-center justify-center text-xl font-semibold lg:visible lg:my-5 lg:h-min">
          {props.title}
        </div>

        <SelectLlm className="col-span-12 mb-6 mt-5 lg:mt-0" />

        <div className="col-span-12 col-start-1 mx-2 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3">
          {props.children}
        </div>

        {chats.map((chat, idx) => (
          <div
            key={idx}
            className="col-span-12 col-start-1 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3 ">
            {idx > 0 && (
              <Card
                className="m-2"
                label={chat.role === 'user' ? 'あなた' : 'AIアシスタント'}>
                {chat.role === 'user' ? (
                  <div className="break-all">
                    {chat.content.split('\n').map((c, jdx) => (
                      <div key={jdx}>{c}</div>
                    ))}
                  </div>
                ) : (
                  <>
                    <Markdown>{chat.content}</Markdown>
                    <div className="flex justify-end">
                      <ButtonCopy
                        className="mr-0.5 text-gray-400"
                        text={chat.content}
                      />
                      <Tooltip message="未実装です">
                        <ButtonFeedback className="mx-0.5" good={true} />
                      </Tooltip>
                      <Tooltip message="未実装です">
                        <ButtonFeedback className="ml-0.5" good={false} />
                      </Tooltip>
                    </div>
                  </>
                )}
              </Card>
            )}
          </div>
        ))}

        {loading && (
          <Card
            className="col-span-12 col-start-1 m-2 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3"
            label="AIアシスタント">
            <div className="animate-pulse text-2xl text-gray-400">
              <PiChatCircleDotsFill />
            </div>
          </Card>
        )}

        {chats.length > 1 && (
          <div className="absolute bottom-0 z-0 flex w-full justify-center">
            {props.inputPromptComponent ? (
              props.inputPromptComponent
            ) : (
              <InputChatContent
                content={content}
                placeholder="チャット形式で結果を改善していくことができます。"
                disabled={loading}
                onChangeContent={setContent}
                onSend={() => {
                  onSend();
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptTamplatePageBase;