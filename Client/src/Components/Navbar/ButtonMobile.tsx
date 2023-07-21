import { Link } from 'react-router-dom';

type navButtonProps = {
  text: string;
  link: string;
  openNav: () => void;
};

const ButtonMobile = ({ text, link, openNav }: navButtonProps) => {
  return (
    <div>
      <Link
        to={link}
        onClick={() => {
          openNav();
        }}
      >
        <div className={`w-32 flex justify-start items-center  my-8  md:mt-4 md:mb-4 md:mr-10 md:ml-10 `}>
          <div className={`text-white  font-light text-xl bg-transparent pr-4 pl-4 pt-2 pb-2 rounded-lg `}>{text}</div>
        </div>
      </Link>
    </div>
  );
};

export default ButtonMobile;
