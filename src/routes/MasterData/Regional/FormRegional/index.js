import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { MdCheckCircle } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/Button";
import TextInput from "../../../../components/TextInput";
import { GET_REGIONAL } from "../../../../constans/constans";
import { findRegional, submitRegional } from "../../../../services/MasterData/regional";

const FormRegional = () => {
  const navigate = useNavigate();
  const params = useParams();
  const currentId = params.id;
  const [name, setName] = React.useState("");

  const { refetch } = useQuery(
    [GET_REGIONAL],
    findRegional(currentId),
    {
      enabled: false,
      onSuccess: (res) => {
        setName(res?.data?.name);
      },
    }
  );

  React.useEffect(() => {
    if (currentId) {
      refetch();
    }
  }, [currentId]);

  const submitGovernmentBusinessMutation = useMutation(
    submitRegional
  );

  const onHandleSubmit = () => {
    submitGovernmentBusinessMutation.mutate(
      {
        id: currentId,
        name,
      },
      {
        onSuccess: (res) => {
          if (res.isSuccess) {
            navigate("/master/opd-daerah");
            alert("BERHASIL");
            setName("");
          }
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">
        Urusan Pemerintah
      </div>
      <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Link to="/master/opd-daerah">
            <BiArrowBack />
          </Link>
          <span className="font-medium text-lg">
            {params?.action === "tambah" ? "Tambah " : "Edit "}
            Urusan Pemerintah
          </span>
        </div>
        <TextInput
          label="Nama Daerah"
          placeholder="Masukkan Nama Daerah"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />

        <div className="flex items-center gap-4 w-60">
          <div className="flex-1">
            <Button
              onClick={onHandleSubmit}
              padding="px-3 py-2"
              text="Simpan"
              icon={<MdCheckCircle />}
            />
          </div>
          <div className="flex-1">
            <Button
              padding="px-3 py-2"
              text="Batal"
              background="#EAEAEA"
              fontColor="#333333"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormRegional;
