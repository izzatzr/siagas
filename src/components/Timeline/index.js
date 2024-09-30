import React, { useState } from 'react';
import TextEditor from '../TextEditorQuill';

const DataEvents = [
  {
    date: '2024 June',
    events: [
      {
        title: 'Pembangunan Desa',
        description: 'Di Desa Kintamani',
      },
      {
        title: 'Pembangunan Desa',
        description: 'Di Desa Kintamani',
      },
    ],
  },
  {
    date: '2023 February',
    events: [
      {
        title: 'Pembangunan Desa',
        description: 'Di Desa Kintamani',
      },
      {
        title: 'Pembangunan Desa',
        description: 'Di Desa Kintamani',
      },
    ],
  },
  {
    date: '2022 March',
    events: [
      {
        title: 'Pembangunan Desa',
        description: 'Di Desa Kintamani',
      },
      {
        title: 'Pembangunan Desa',
        description: 'Di Desa Kintamani',
      },
    ],
  },
];

const Timeline = (props) => {
  // const { value } = props;
  // console.log(value, 'ini props timeline');

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEdit = (card) => {
    setSelectedEvent(card);
  };

  return (
    <div>
      {selectedEvent ? (
        <TextEditor selectedEvent={selectedEvent} />
      ) : (
        <ol className="ms-4 relative border-s border-gray-200 dark:border-gray-700">
          {DataEvents.map((event, idx) => (
            <li key={idx} className="mb-10 ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
              <time className="mb-1 text-lg font-bold leading-none text-dark ">
                {/* {event.date_groups} */}
              </time>
              {/* {event.details.map((card, cardIdx) => ( */}
                <div
                  // key={cardIdx}
                  className="border mt-3 border-gray-600 rounded-lg px-4 py-4 bg-white w-70 z-10 sm:w-72 me-2 mb-2 cursor-pointer hover:shadow-lg"
                  onClick={() => handleEdit()}
                >
                  <div className="">
                    {/* <div className="text-black text-xl font-medium">
                      {card.comment[0]}
                    </div> */}
                    <div className="text-black mb-4 text-left h-[50px]">
                      {/* {card.date_formatted} */}
                    </div>
                  </div>
                </div>
              {/* ))} */}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Timeline;
