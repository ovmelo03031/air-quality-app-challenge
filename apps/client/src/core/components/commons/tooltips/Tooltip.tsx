import {
  Tooltip as TooltipComponent,
  TooltipContent,
  TooltipTrigger,
} from '@components-ui/tooltip';

interface TooltipProps extends React.PropsWithChildren {
  text: string;
}

const Tooltip = ({ children, text }: TooltipProps) => {
  return (
    <TooltipComponent>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </TooltipComponent>
  );
};

export default Tooltip;
