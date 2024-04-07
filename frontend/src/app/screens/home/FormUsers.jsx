import Layout from "../../shared/Layout"
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useCreateUser from "../../logic/hooks/useCreateUser";
import Form from "./components/Form";

function FormUsers() {
  const { id } = useParams();
  
  const isEditing = false

  const { createUser, updateUser, isLoading } = useCreateUser();

  const { control, handleSubmit, formState: { errors }, setError, setValue } = useForm({
    defaultValues:
    {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      dateOfBirth: "",
      roleId: null,
    }
  });

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await updateUser({ ...data, id });
      } else {
        console.log(data);
        await createUser(data);
      }
      //navigation('/')
    } catch (error) {
      setError("name", { type: "manual", message: "Error en el servidor, por favor intente más tarde" });
    }
  }

  return (
    <Layout>
      <Form control={control} handleSubmit={handleSubmit} errors={errors} onSubmit={onSubmit} setValue={setValue} isLoading={isLoading} isEditing={isEditing} />
    </Layout>
  )
}

export default FormUsers