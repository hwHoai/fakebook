import logo from '../../assets/img/icon.webp';
export const Loading = () => {
  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-primary-light'>
      {/* Facebook Logo */}
      <div className='mb-8'>
        <img src={logo} alt='logo' sizes='100' className='h-20 w-20 animate-bounce' />
      </div>
      {/* From Meta */}
      <div className='mt-16 text-gray-500 text-sm'>
        from
        <span className='font-bold ml-1'>Hữu Hoài, Hoàng Nam, Trọng Vinh, Phước Được</span>
      </div>
    </div>
  );
};