import { PropsWithChildren, useState } from "react";

import {
  DefaultStreamChatGenerics,
  ChannelListMessengerProps,
  LoadingErrorIndicator,
  LoadingIndicator,
} from "stream-chat-react";

import type { APIErrorResponse, Channel, ErrorFromResponse } from "stream-chat";

import { MessageSquarePlus } from "lucide-react";

export default function CustomListContainer(
  props: PropsWithChildren<ChannelListMessengerProps<DefaultStreamChatGenerics>>
) {
  const { children, error = null, loading, loadedChannels } = props;

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  function closeDiaog() {
    setDialogIsOpen(false);
  }

  if (error) {
    return <LoadingErrorIndicator />;
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <section>
      <div className="str-chat__channel-list-messenger str-chat__channel-list-messenger-react">
        <div
          className="str-chat__channel-list-messenger__main str-chat__channel-list-messenger-react__main"
          role="listbox"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
