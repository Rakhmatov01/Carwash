import * as React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Rating,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function RatingPopup({ open, onClose, onSubmit }) {
  const [value, setValue] = React.useState(null);
  
  // debugging: see when the dialog component renders and what `open` prop is
  React.useEffect(() => {
    console.log("RatingPopup render, open=", open);
  }, [open]);

  // When the dialog mounts/opened due to a click, that same click can
  // sometimes register as a backdrop click on the newly-mounted backdrop
  // and immediately close it. To avoid silently swallowing all backdrop
  // closes, only ignore backdrop clicks for a short window right after
  // `open` becomes true.
  const ignoreBackdropRef = React.useRef(false);
  React.useEffect(() => {
    let t;
    if (open) {
      ignoreBackdropRef.current = true;
      t = setTimeout(() => (ignoreBackdropRef.current = false), 200);
    } else {
      ignoreBackdropRef.current = false;
    }
    return () => clearTimeout(t);
  }, [open]);

  const handleSubmit = () => {
    if (onSubmit) onSubmit(value);
    setValue(null);
    onClose?.();
  };

  // wrap the `onClose` callback so that a click that immediately follows the
  // opener button (when the dialog is rendered under the cursor) doesn't
  // trigger a backdropClick close.  MUI passes a `reason` argument which can
  // be "backdropClick" or "escapeKeyDown" among others.
  const handleDialogClose = (event, reason) => {
    if (reason === "backdropClick") {
      // If we're in the brief window after opening, ignore this backdrop
      // click because it's likely the original opener click. Otherwise
      // allow backdrop clicks to close the dialog as usual.
      if (ignoreBackdropRef.current) return;
    }
    onClose?.(event, reason);
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      PaperPropsrops={{
        sx: {
          width: 640,
          maxWidth: "90vw",
          borderRadius: 3,
          py: 2,
        },
      }}
    >
      <DialogContent sx={{ position: "relative", px: 5, py: 4 }}>
        {/* close button */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 12, right: 12 }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: 28, fontWeight: 700, mb: 2 }}>
            How would you rate this carwash?
          </Typography>

          <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}>
            Select Rating
          </Typography>

          <Rating
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            size="large"
            sx={{
              fontSize: 46, // big stars like Udemy
              "& .MuiRating-iconFilled": { color: "#F59E0B" },
              "& .MuiRating-iconHover": { color: "#F59E0B" },
              "& .MuiRating-iconEmpty": { color: "#F59E0B" },
            }}
          />

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!value}
              sx={{ borderRadius: 2, px: 3, py: 1 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}