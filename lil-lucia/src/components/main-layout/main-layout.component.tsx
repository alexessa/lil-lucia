import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { Navigation } from "./navigation/navigation.component";
import { Cake } from "@mui/icons-material";
import { pink } from "@mui/material/colors";

export const MainLayout = () => {
  return (
    <Box>
      <AppBar position="fixed" sx={{ background: pink[300] }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Link to="/" className="all-unset">
                <Typography
                  variant="h5"
                  sx={{ width: "fit-content", cursor: "pointer" }}
                >
                  <Cake /> Lil Lucia
                </Typography>
              </Link>
            </Box>
          </Box>
          <Navigation />
        </Toolbar>
      </AppBar>
      <Box>
        <Toolbar />
      </Box>
    </Box>
  );
};
