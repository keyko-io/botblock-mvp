import { Loader } from "./Loader";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";

interface ButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
  title: string;
  onClick?: () => void;
  showArrowIcon?: boolean;
}

export const Button = ({ disabled = false, isLoading = false, title, onClick, showArrowIcon = false }: ButtonProps) => {
  return (
    <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
      <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
        <div className="flex rounded-full border-2 border-primary p-1">
          <button
            className="btn btn-primary w-fit rounded-full capitalize font-normal font-white flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
            onClick={onClick}
            disabled={disabled || isLoading}
            type="button"
          >
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {title} {showArrowIcon ? <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" /> : ""}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
