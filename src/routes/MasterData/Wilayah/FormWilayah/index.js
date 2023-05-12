import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { MdCheckCircle } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/Button";
import TextInput from "../../../../components/TextInput";
import { GET_WILAYAH } from "../../../../constans/constans";
import {
  findWilayah,
  submitWilayah,
} from "../../../../services/MasterData/wilayah";

const FormWilayah = () => {
  const navigate = useNavigate();
  const params = useParams();
  const currentId = params.id;
  const [name, setName] = React.useState("");

  const { refetch } = useQuery([GET_WILAYAH], findWilayah(currentId), {
    enabled: false,
    onSuccess: (res) => {
      setName(res?.data?.name);
    },
  });

  React.useEffect(() => {
    if (currentId) {
      refetch();
    }
  }, [currentId]);

  const submitWilayahMutation = useMutation(submitWilayah);

  const onHandleSubmit = () => {
    let payload = {
      name: name,
      region_id: null,
    };
    submitWilayahMutation.mutate(
      {
        id: currentId,
        ...payload,
      },
      {
        onSuccess: (res) => {
          if (res.isSuccess) {
            navigate("/master/wilayah");
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
      <div className="text-[#333333] font-medium text-2xl">Wilayah</div>
      <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Link to="/master/wilayah">
            <BiArrowBack />
          </Link>
          <span className="font-medium text-lg">
            {params?.action === "tambah" ? "Tambah " : "Edit "}
            Wilayah
          </span>
        </div>
        <TextInput
          label="Nama Wilayah"
          placeholder="Tullis Nama Wilayah..."
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

export default FormWilayah;
