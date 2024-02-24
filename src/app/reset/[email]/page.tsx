async function User({ params }: { params: { email: string } }) {
  // here u send the params.email + new password
  return (
    <div className="pt-[14rem] w-full flex justify-center text-white  pb-[12rem] md:px-24  ">
      <p>{params.email}</p>
    </div>
  );
}

export default User;
