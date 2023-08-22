import React from "react";
import Accordion from "../../../components/Accordion";

const dataFAQ = [
  {
    title:
      "Perbedaan antara Menu Database Inovasi Daerah dengan Menu Lomba Inovasi Daerah",
    isOpen: true,
    children: [
      {
        title:
          "Menu Database Inovasi Daerah terdiri atas submenu Profil Pemda dan Inovasi Daerah",
        children: [
          {
            title: `Profil Pemda merupakan submenu yang berfungsi sebagai
              pengelolaan semua data indikator aspek Satuan Pemerintah
              Daerah, pengeditan alamat Pemda, alamat email, nomor
              telephone dan nama admin pengelola`,
          },
          {
            title: `Inovasi Daerah merupakan submenu yang berfungsi untuk
            mengupload data Inovasi Daerah baik oleh Akun Pemda maupun
            Akun OPD, mengelola seluruh data Inovasi dan Indikator
            Satuan Inovasi serta melihat statistik data terkait dengan
            jumlah Inovasi Daerah pertahapan.`,
          },
        ],
      },
      {
        title:
          "Lomba Inovasi Daerah terdiri atas submenu Inovasi Pemerintah Daerah dan Inovasi Masyarakat :",
        children: [
          {
            title: `Inovasi Pemerintah Daerah merupakan submenu yang berfungsi
              untuk menghimpun dan mengelola berbagai data Inovasi yang
              berasal dari Lomba Inovasi yang diadakan oleh Pemerintah
              Daerah terkait`,
          },
          {
            title: `Inovasi Masyarakat merupakan submenu yang berfungsi untuk
              menghimpun dan mengelola berbagai Inovasi Daerah yang di
              inisiasi oleh Masyarakat secara mandiri`,
          },
        ],
      },
    ],
  },
  {
    title:
      "Apa yang harus dilakukan juka saya terlanjur menginput data inovasi pada menu Lomba Inovasi Daerah?",
    isOpen: false,
    children: [
      {
        title:
          "Menu Database Inovasi Daerah terdiri atas submenu Profil Pemda dan Inovasi Daerah",
        children: [
          {
            title: `Profil Pemda merupakan submenu yang berfungsi sebagai
              pengelolaan semua data indikator aspek Satuan Pemerintah
              Daerah, pengeditan alamat Pemda, alamat email, nomor
              telephone dan nama admin pengelola`,
          },
          {
            title: `Inovasi Daerah merupakan submenu yang berfungsi untuk
            mengupload data Inovasi Daerah baik oleh Akun Pemda maupun
            Akun OPD, mengelola seluruh data Inovasi dan Indikator
            Satuan Inovasi serta melihat statistik data terkait dengan
            jumlah Inovasi Daerah pertahapan.`,
          },
        ],
      },
      {
        title:
          "Lomba Inovasi Daerah terdiri atas submenu Inovasi Pemerintah Daerah dan Inovasi Masyarakat :",
        children: [
          {
            title: `Inovasi Pemerintah Daerah merupakan submenu yang berfungsi
              untuk menghimpun dan mengelola berbagai data Inovasi yang
              berasal dari Lomba Inovasi yang diadakan oleh Pemerintah
              Daerah terkait`,
          },
          {
            title: `Inovasi Masyarakat merupakan submenu yang berfungsi untuk
              menghimpun dan mengelola berbagai Inovasi Daerah yang di
              inisiasi oleh Masyarakat secara mandiri`,
          },
        ],
      },
    ],
  },
];

const FAQ = () => {
  const [faq, setFAQData] = React.useState(dataFAQ);

  const handleOpenAccordion = (index) => {
    setFAQData((prevFAQ) =>
      prevFAQ.map((item, i) =>
        i === index ? {...item, isOpen: !item.isOpen} : item
      )
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] text-2xl">
        <b>FAQ</b> (Frequently Ask Question )
      </div>
      <div className="flex flex-col gap-3">
        {faq.map((item, index) => (
          <Accordion
            key={item.title}
            label={item.title}
            isOpen={item.isOpen}
            index={index}
            setIsOpen={(value) => handleOpenAccordion(value)}
          >
            <div className="text-[#434343]">
              <p>{item.title} sebagai berikut:</p>
              {item.children && (
                <ol
                  className="list-inside list-[upper-alpha]"
                  style={{listStyle: "revert-layer"}}
                >
                  {item.children.map((child) => (
                    <li className="mt-4" key={child.title}>
                      Menu Database Inovasi Daerah terdiri atas submenu Profil
                      Pemda dan Inovasi Daerah :
                      {child.children && (
                        <ul className="pl-8 mt-4 space-y-1 list-disc list-outside">
                          {child.children.map((subchild) => (
                            <li key={subchild.title}>{subchild.title}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
