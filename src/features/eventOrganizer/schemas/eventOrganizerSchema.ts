import * as yup from "yup";

export const updateEventOrganizerSchema = yup.object().shape({
  companyName: yup.string(),
  email: yup.string(),
  phoneNumber: yup.string(),
  address: yup.string(),
  websiteUrl: yup.string(),
  bankAccount: yup.string(),
  bannerUrl: yup.array().of(
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
