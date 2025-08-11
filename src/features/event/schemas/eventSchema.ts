import * as yup from "yup";

export const createEventSchema = yup.object().shape({
  eventName: yup.string().required("Event Name is required"),
  category: yup.string().required("Category is required"),
  startDate: yup.date().required("Start Date is required"),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "End date cannot be before start date")
    .required("End Date is required"),
  description: yup.string().required("Description is required"),
  availableTicket: yup.number().required("Available Ticket is required"),
  price: yup.number().required("Price is required"),
  venueName: yup.string().required("Venue Name is required"),
  venueCapacity: yup.string().required("Venue Capacity is required"),
  address: yup.string().required("Address is required"),
  image: yup
    .array()
    .of(
      yup
        .mixed<File>()
        .test("fileSize", "Maximum file size is 2mb", (file) => {
          // console.log(file)
          const maximumFileSize = 2000000;

          return file && file.size <= maximumFileSize;
        })
        .test("fileFormat", "format file not accepted", (file) => {
          const fileFormatAccepted = ["jpg", "jpeg", "png", "webp", "svg"];

          return file && fileFormatAccepted.includes(file?.type?.split("/")[1]);
        })
    )
    .min(1, "Must select file image"),
});

export const updateEventSchema = yup.object().shape({
  eventName: yup.string(),
  category: yup.string(),
  startDate: yup.date(),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "End date cannot be before start date"),
  description: yup.string(),
  availableTicket: yup.number(),
  price: yup.number(),
  venueName: yup.string(),
  venueCapacity: yup.string(),
  address: yup.string(),
  image: yup.array().of(
    yup
      .mixed<File>()
      .test("fileSize", "Maximum file size is 2mb", (file) => {
        // console.log(file)
        const maximumFileSize = 2000000;

        return file && file.size <= maximumFileSize;
      })
      .test("fileFormat", "format file not accepted", (file) => {
        const fileFormatAccepted = ["jpg", "jpeg", "png", "webp", "svg"];

        return file && fileFormatAccepted.includes(file?.type?.split("/")[1]);
      })
  ),
});

export const PromoSchema = yup.object().shape({
  discountValue: yup.number()
    .min(0, 'Nilai diskon minimal 0%')
    .max(100, 'Nilai diskon maksimal 100%')
    .required('Nilai diskon wajib diisi'),
  description: yup.string()
    .required('Deskripsi wajib diisi'),
  availableCoupon: yup.number()
    .min(1, 'Jumlah kupon minimal 1')
    .required('Jumlah kupon wajib diisi'),
  eventId: yup.string()
    .required('Nama acara wajib dipilih'),
  startDate: yup.date()
    .required('Tanggal mulai wajib diisi'),
  endDate: yup.date()
    .required('Tanggal selesai wajib diisi')
    .min(yup.ref('startDate'), 'Tanggal selesai tidak boleh sebelum tanggal mulai'),
});