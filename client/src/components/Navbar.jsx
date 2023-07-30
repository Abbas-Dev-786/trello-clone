import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./Search";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useToggleMode } from "../context/theme/useToggleMode";

const Navbar = () => {
  const { mode, setMode } = useToggleMode();

  return (
    <AppBar
      position="sticky"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "white" }}
    >
      {/* <Container maxWidth="xl"> */}
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          // sx={{ mr: 1 }}
        >
          <BubbleChartIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "block" },
          }}
        >
          Trello
        </Typography>

        <IconButton
          color="inherit"
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
        >
          {mode === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
};

export default Navbar;
