import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale('es');

export const formatDate = (date: Date) => dayjs(date).format('D [de] MMMM[,] YYYY [a las] h:mm A')