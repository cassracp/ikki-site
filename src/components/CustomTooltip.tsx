import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import type { TooltipProps } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "var(--ink-black)",
    color: "var(--bg-paper)",
    boxShadow: "3px 3px 0px rgba(0,0,0,0.3)",
    border: "1px solid var(--pencil-gray)",
    fontFamily: "var(--font-main)",
    fontWeight: "bold",
    fontSize: "0.75rem",
    textTransform: "uppercase",
    padding: "6px 10px",
    borderRadius: "0",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "var(--ink-black)",
  },
}));
