import Image from 'next/image';
import arrow from '@public/assets/icons/arrow.svg';
import near from '@public/assets/icons/near.svg';
import jewellery from '@public/assets/images/jewellery-13325 1.png';

const SavedItems = () => {
    return (
        <main>
            <section>
                <div className='w-[300px]'>
                    <div>
                        <Image src={jewellery} alt='product' /> 
                    </div>
                    <hr className='w-full' />
                    <div className='flex justify-between'>
                        <p>Celestial Luster</p>
                        <span className='flex gap-2'>
                            <Image src={near} width={15} height={15} alt='Near' />
                            <p>500</p>
                        </span>
                    </div>
                    <div>
                        <button>
                            Buy now
                        </button>
                    </div>
                </div>
            </section>

            <section>
                <button>
                    <Image src={arrow} alt='previous page' />
                    <p>Previous</p>
                </button>
                <button>
                <p>Next</p>
                <Image src={arrow} alt='previous page' />
                </button>
            </section>
        </main>
    )
}

export default SavedItems;