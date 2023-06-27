import React, { useState } from 'react';
import { useCollapse } from 'react-collapsed'

const QuestionDetail = ({ questionBody }) => {

    const [isExpanded, setExpanded] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded, collapsedHeight: 42 })

    return (
        <div className='flex flex-col px-4 py-5 rounded-[30px] w-[90%] sm:w-[400px] max-h-[800px] bg-white shadow-lg gap-2'>
            <div className="header flex items-center justify-between">
                <div className='title flex items-center gap-2'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z" stroke="#A8A8A8" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M11.9955 12H12.0045M15.991 12H16M8 12H8.00897" stroke="#A8A8A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h1 className='text-sm font-semibold text-[#A8A8A8]'>Question Detail</h1>
                </div>
            </div>

            <div className="question text-sm font-base black px-8"{...getCollapseProps()} dangerouslySetInnerHTML={ isExpanded ? { __html: questionBody } : { __html: questionBody.substring(0, 150) } }></div>

            <div className='expand flex item-center justify-end cursor-pointer' {...getToggleProps({
                onClick: () => setExpanded((prevExpanded) => !prevExpanded),
            })}>
                {
                isExpanded ?
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 13.5L12 10.5L9 13.5" stroke="#A8A8A8" />
                    </svg>
                    :
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 10.5L12 13.5L15 10.5" stroke="#A8A8A8" />
                    </svg>
                }
                <p className='text-sm font-semibold text-[#A8A8A8]'>{isExpanded ? 'Collapse' : 'Expand'}</p>
            </div>
        </div>
    )
}

export default QuestionDetail;