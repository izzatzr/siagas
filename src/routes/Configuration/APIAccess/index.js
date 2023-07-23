import React from "react";
import Toolbar from "../../../components/Toolbar";

const APIAccess = () => {
  const dummyResponse = {
    status: 1,
    token: "23423sjdfksdgjsdfsd",
  };
  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <Toolbar title="Akses API" />
      <div className="w-full rounded-lg bg-white py-4 px-6 flex flex-col">
        <span className="capitalize font-bold">API KEY</span>
        <div className="p-2 bg-gray-200 text-sm w-[30%] mt-2">
          8444cc9fbf29afj23n42j4k234
        </div>
        <span className="capitalize font-bold mt-4">API SECRET</span>
        <div className="p-2 bg-gray-200 text-sm w-[30%] mt-2">
          8444cc9fbf29afj23n42j4k234
        </div>
        <span className="font-bold mt-4">Petunjuk Penggunaan</span>
        <p className="mt-4">
          Silahkan gunakan API Key diatas untuk dapat mengakses REST API Indeks
          Innovasi
        </p>
        <span className="font-bold mt-4">API Endpoint</span>
        <div className="p-4 bg-gray-100 text-sm mt-2">
          https://api.indeks.inovasi.litbang.kemendegri.go.id
        </div>
        <span className="font-bold mt-4">Referensi API</span>
        <span className="font-bold mt-4">Access Token</span>
        <div className="p-4 bg-gray-100 text-sm mt-2">
          GET /api/token?key=asdkjtuqew2342ka
        </div>
        <span className="mt-4">Parameter :</span>
        <span className="mt-4">
          |Nama|Type|Keterangan|Key|String|API Key Anda|String|API Secret Anda
        </span>
        <span className="mt-4">Response API :</span>
        <div className="p-4 bg-gray-100 text-sm mt-2">
          {JSON.stringify(dummyResponse, null, 2)}
        </div>
      </div>
    </div>
  );
};

export default APIAccess;
