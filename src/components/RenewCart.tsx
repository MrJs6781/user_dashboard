import { UserProductResponse } from "@/types/UserProducts";

interface RenewCartProps {
  data: UserProductResponse;
}

export default function RenewCart({ data }: RenewCartProps) {
  return (
    <div className="w-full max-w-[350px] flex flex-col items-start gap-4 rounded-[12px] border">
      <img
        src={data.ImageUrl ? data.ImageUrl : "/public/product_image.jpg"}
        alt="Image"
        className="w-full h-full max-h-[150px] object-cover bg-no-repeat rounded-tr-[12px] rounded-tl-[12px]"
      />
      <span className="w-full h-full flex flex-col items-start gap-4 px-2 pb-4">
        <span className="flex items-center gap-2 text-[15px] font-vazirM gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]">
          نام محصول :{" "}
          <h5 className="gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
            {data.Title}
          </h5>
        </span>
        <span className="flex items-center gap-2 text-[15px] font-vazirM gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]">
          دسته :{" "}
          <h5 className="gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
            {data.CategoryTitle}
          </h5>
        </span>
        <span className="flex items-center gap-2 text-[15px] font-vazirM gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]">
          گروه :{" "}
          <h5 className="gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
            {data.GroupTitle}
          </h5>
        </span>
        <span className="flex items-center gap-2 text-[15px] font-vazirM gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]">
          قیمت خرید :{" "}
          <h5 className="gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
            {data.Fi}
          </h5>{" "}
          تومان
        </span>
        <span className="flex items-center gap-2 text-[15px] font-vazirM gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]">
          قیمت تمدید :{" "}
          <h5 className="gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
            {data.RenewFi}
          </h5>{" "}
          تومان
        </span>
      </span>
      <button className="w-[95%] mx-auto mb-4 rounded-[12px] h-[50px] flex items-center justify-center outline-none cursor-pointer border-none bg-[#a855f7] dark:bg-[#1e293b]">
        <p className="text-[15px] font-vazirB text-white">
          تمدید
        </p>
      </button>
    </div>
  );
}
