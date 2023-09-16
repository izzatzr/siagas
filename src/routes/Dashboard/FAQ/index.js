import React from "react";
import Accordion from "../../../components/Accordion";
import { useQuery } from "react-query";
import { GET_ALL_FAQ } from "../../../constans/constans";
import { getAllFAQ } from "../../../services/MasterData/faq";
import parse from "html-react-parser";
import { useUtilContexts } from "../../../context/Utils";

const initialFilter = {
  limit: 20,
  page: 1,
  q: "",
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const { isLoading, data: faq } = useQuery({
    queryKey: [GET_ALL_FAQ, initialFilter],
    queryFn: getAllFAQ(initialFilter),
  });
  const { setLoadingUtil, snackbar } = useUtilContexts();

  React.useEffect(() => {
    if (isLoading) {
      setLoadingUtil(true);
    } else {
      setLoadingUtil(false);
    }
  }, [isLoading]);

  if (!isLoading) {
    return (
      <div className="flex flex-col w-full gap-6 py-6">
        <div className="text-[#333333] text-2xl">
          <b>FAQ</b> (Frequently Ask Question )
        </div>
        <div className="flex flex-col gap-3">
          {faq.data.map((item, index) => (
            <Accordion
              key={item.id}
              label={item.question}
              isOpen={index === openIndex}
              toggleAccordion={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              <div className="text-[#434343]">{parse(item.answer)}</div>
            </Accordion>
          ))}
        </div>
      </div>
    );
  }
};

export default FAQ;
