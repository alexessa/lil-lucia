import React, { useState } from "react";
import {
  AppBar,
  Box,
  Dialog,
  Hidden,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Close, Menu } from "@mui/icons-material";

import NavLinks from "./nav-links";

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children: React.ReactElement<any> },
    ref: React.Ref<unknown>
  ) => {
    return <Slide direction="left" ref={ref} {...props} />;
  }
);

export const Navigation = () => {
  const [open, setOpen] = useState(false);

  const onOpenHandler = () => setOpen(true);
  const onCloseHandler = () => setOpen(false);

  return (
    <>
      <Hidden smDown>
        <Box>
          <NavLinks />
        </Box>
      </Hidden>
      <Hidden smUp>
        <IconButton color="inherit" onClick={onOpenHandler}>
          <Menu />
        </IconButton>
        <Dialog
          open={open}
          fullScreen
          fullWidth
          TransitionComponent={Transition}
          hideBackdrop
        >
          <AppBar
            position="static"
            sx={{ background: "white", color: "text.primary" }}
          >
            <Toolbar>
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                Menu
              </Typography>
              <IconButton color="inherit" onClick={onCloseHandler}>
                <Close />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box display="flex" flexDirection="column" py={3} width={"100%"}>
            <NavLinks close={onCloseHandler} />
          </Box>
        </Dialog>
      </Hidden>
    </>
  );
};
