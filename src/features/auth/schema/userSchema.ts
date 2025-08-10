import * as yup from "yup";

export const updateUserSchema = yup.object().shape({
  idCardNumber: yup.string(),
  fullName: yup.string(),
  dateOfBirth: yup.date(),
  email: yup.string(),
  phoneNumber: yup.string(),
  profilePicture: yup.array().of(
    yup
      .mixed<File>()
      .test("fileSize", "Maximum file size is 2mb", (file) => {
        const maximumFileSize = 2000000;

        return file && file.size <= maximumFileSize;
      })
      .test("fileFormat", "format file not accepted", (file) => {
        const fileFormatAccepted = ["jpg", "jpeg", "png", "webp", "svg"];

        return file && fileFormatAccepted.includes(file?.type?.split("/")[1]);
      })
  ),
});
