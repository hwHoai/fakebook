import { Search, MoreHorizontal } from 'lucide-react'; // Import icons
import { useTranslation } from 'react-i18next'; // Import i18n translation

export const SidebarRight = () => {
  const { t } = useTranslation();
  return (
    <div className='fixed z-999 right-0 top-23 h-full w-[23%] bg-white p-4'>
      {/* Suggestion Section */}
      <div>
        <h2 className='text-xl font-semibold text-gray-800'>{t('sidebar_right.suggest')}</h2>
        <div className='mt-2 space-y-3'>
          {['Dep trai vai', 'Anh toc xanh', 'Luffy Nguyen'].map((name, index) => (
            <div key={index} className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <img src='src/assets/img/test.jpg' alt={name} className='w-10 h-10 rounded-full' />
                <span className='text-base text-gray-700'>{name}</span>
              </div>
              <button className='bg-[#3b1e67] text-white px-4 py-1 text-sm rounded-lg cursor-pointer'>
                {t('button.follow')}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <hr className='my-4 border-gray-300' />

      {/* Contacts Section */}
      <div>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-semibold text-gray-800'>{t('sidebar_right.contact')}</h2>
          <div className='flex gap-2'>
            <Search className='w-5 h-5 text-gray-600 cursor-pointer' />
            <MoreHorizontal className='w-5 h-5 text-gray-600 cursor-pointer' />
          </div>
        </div>

        <div className='mt-2 space-y-3'>
          {Array(5)
            .fill('Luffy Nguyen')
            .map((name, index) => (
              <div
                key={index}
                className='flex items-center justify-between cursor-pointer hover:bg-gray-200 rounded-md px-2 py-2'
              >
                <div className='flex items-center gap-3 relative'>
                  <img src='src/assets/img/test.jpg' alt={name} className='w-8 h-8 rounded-full' />
                  {/* Online Status */}
                  {index % 2 === 0 && (
                    <span className='absolute bottom-0 left-7 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></span>
                  )}
                  <span className='text-gray-700 text-sm'>{name}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
