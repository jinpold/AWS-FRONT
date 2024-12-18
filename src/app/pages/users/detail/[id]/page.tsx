'use client';

import { MyTypography } from "@/app/component/common/style/cell";
import { IUser } from "@/app/component/users/model/user.model";
import { deleteUserById, modifyUserById } from "@/app/component/users/service/user.service";
import { getAllUsers } from "@/app/component/users/service/user.slice";
import { Card } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function UserDetailPage({ params }: any) {
  const dispatch = useDispatch();
  const router = useRouter();

  // 유저 데이터 불러오기
  const user: IUser = useSelector(getAllUsers).find((user: IUser) => user.id === params.id);
  const userInfo = jwtDecode<any>(parseCookies().accessToken);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      id: userInfo.id, // 기본값 설정
      name: user?.name || "",
      password: "",
      address: user?.address || "",
      phone: user?.phone || "",
    },
    mode: "onChange",
  });

  // 수정 요청
  const onSubmit = (data: any) => {
    console.log("Payload to submit:", data);
    dispatch(modifyUserById(data))
      .then((res: any) => {
        alert('User information modified successfully. ID: ' + res.payload.id);
        location.reload();
      })
      .catch((error: any) => {
        alert('User information modify failed.');
        console.error("Error:", error);
      });
  };

  // 삭제 요청
  const handleDelete = () => {
    alert("User를 삭제합니다.");
    dispatch(deleteUserById(userInfo.id))
      .then(() => location.reload())
      .catch((error:any) => console.error("Error deleting user:", error));
  };

  return (
    <Card sx={{ padding: '1.5rem', height: 'auto', maxWidth: '600px', margin: 'auto', marginTop: '6rem', borderRadius: '12px', border: '2px solid #8B4513' }}>
      <div className="mb-4 text-center"></div>

      <div className="items-center flex justify-center px-4 lg:px-0 py-4">
        <div className="max-w-screen-lg bg-white border shadow sm:rounded-lg flex justify-center flex-1">
          <div className="w-1/4 bg-red-950 text-center hidden md:flex"></div>
          <div className="w-3/4 p-4 sm:p-6">
            <div className="flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-xl xl:text-2xl font-extrabold text-red-950">
                  {MyTypography(userInfo.username, "1.5rem")}
                  My Page
                </h1>
                <p className="text-[10px] text-gray-500 mt-1">변경사항을 기입하세요</p>
              </div>
              <div className="w-full flex-1 mt-4">
                <form className="mx-auto max-w-md flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                  {/* Hidden ID */}
                  <input type="hidden" {...register("id")} />

                  <div>
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2">Name</label>
                    <input
                      className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      {...register("name", { required: true })}
                      placeholder="Real Name"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2">Password</label>
                    <input
                      className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password"
                      {...register("password", { required: true })}
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2">Street Address</label>
                    <input
                      className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      {...register("address", { required: true })}
                      placeholder="555 Roadrunner Lane"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2">Phone</label>
                    <input
                      className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      {...register("phone", { required: true })}
                      placeholder="(555) 555-5555"
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      className="btn bg-red-950 text-gray-100 py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                      onClick={() => router.back()}
                      type="button"
                    >
                      CANCEL
                    </button>
                    <button
                      className="btn bg-red-950 text-gray-100 py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                      type="submit"
                    >
                      SUBMIT
                    </button>
                    <button
                      className="btn bg-red-950 text-gray-100 py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                      onClick={handleDelete}
                      type="button"
                    >
                      DELETE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
