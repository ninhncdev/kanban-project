export const replaceName = (name: string): string => {
  if (!name) return "";

  return name
    .toLowerCase() // chuyển thành chữ thường
    .normalize("NFD") // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/đ/g, "d") // chuyển đ → d
    .replace(/[^a-z0-9\s-]/g, "") // xóa ký tự đặc biệt
    .trim() // bỏ khoảng trắng đầu cuối
    .replace(/\s+/g, "-"); // thay khoảng trắng thành dấu gạch ngang
};
