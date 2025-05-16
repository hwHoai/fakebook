import { Post } from '../common/Post';
import { X } from 'lucide-react';
import { CommentBox } from '../common/CommentBox';
import { Comment } from '../common/Comment';

export const PostDetail = ({ post, onClosePostDetail }) => {
  const comments = [
    { id: 1, user: 'John Doe', text: 'Nice post!', time: '2h', avatar: 'src/assets/img/test.jpg' },
    { id: 2, user: 'Jane Smith', text: 'Wow! Amazing', time: '1h', avatar: 'src/assets/img/test.jpg' },
    {
      id: 3,
      user: 'Nam Hoàng',
      text:
        'Ù Ù khẹc khẹc kkkk, hahahahah cái này hài vãi 123123 123 123 123 ' +
        'Thêm text dài để kiểm tra dòng thứ 3, còn tiếp không nào? Xem thêm  có hiện không?',
      time: '1h',
      avatar: 'src/assets/img/test.jpg'
    },
    {
      id: 4,
      user: 'Nam Hoàng 1',
      text:
        'Ù Ù khẹc khẹc kkkk, hahahahah cái này hài vãi 123123 123 123 123 ' +
        'Thêm text dài để kiểm tra dòng thứ 3, còn tiếp không nào? Xem thêm  có hiện không?',
      time: '1h',
      avatar: 'src/assets/img/test.jpg'
    }
  ];

  const handleOverlayClick = (event) => {
    if (event.target.id === 'popup-overlay') {
      onClosePostDetail();
    }
  };

  return (
    <div
      id='popup-overlay'
      onClick={handleOverlayClick}
      className='fixed inset-0 bg-white/70 z-2000 flex items-center justify-center'
    >
      <div className='bg-[#f3ecfe] min-w-140 rounded-2xl max-h-[95vh] overflow-y-auto overflow-x-hidden w-[500px]'>
        {/* Header */}
        <div className='border-b z-2000 sticky top-0 bg-[#f3ecfe] border-b-[#d0d3d7] flex justify-between items-center p-2'>
          <div></div>
          <div className='font-bold text-lg'>Nam's Post</div>
          <button onClick={onClosePostDetail} className='p-2 rounded-full hover:bg-gray-200'>
            <X size={20} />
          </button>
        </div>

        {/* Post Content */}
        <Post media={post.media} />

        {/* Comment Section */}
        <div className='w-full min-h-25 border-t border-t-[#d0d3d7] p-3 space-y-2  '>
          {comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </div>

        {/* Comment Input */}
        <div className='sticky border-t border-t-[#d0d3d7] bottom-0'>
          <CommentBox />
        </div>
      </div>
    </div>
  );
};
