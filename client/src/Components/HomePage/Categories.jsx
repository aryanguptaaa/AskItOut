import React from 'react';
import CategoryList from '../../Assets/images/Categories';

const Categories = () => {

    return (
        <div className='py-2'>
            <div className='text-2xl font-medium pb-2 px-4'>Categories</div>
            <div className='flex justify-start items-center gap-4 overflow-x-auto cursor-pointer px-4'>
                {
                    CategoryList.map((category) => (
                        <div key={category.icon} className='flex flex-col justify-center items-center hover:text-black'>
                            <div id="categoryIcon" className='bg-[#ffffff] w-[60px] h-[60px] rounded-full flex justify-center items-center'>
                                <img src={category.icon} alt={category.name} width={40} height={40} />
                            </div>
                            <div id="categoryName" className='text-[#A8A8A8] text-sm whitespace-nowrap hover:text-black'>
                                {category.name}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories
