import { InboxList } from '../../components/common/InboxList';
import { ProfilePanel } from '../../components/common/ProfilePanel';
import { ChatWindow } from '../../components/common/ChatWindow';

export const ChatPage = () => {
  return (
    <div className='flex h-screen bg-white'>
      <InboxList />
      <ChatWindow />
      <ProfilePanel />
    </div>
  );
};
