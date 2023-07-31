import { Box, Container } from "@mui/material";
import MainCard from "./MainCard";

const CardContainer = () => {
  return (
    <div className="wrapper">
      <Container maxWidth="xl">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={10}
          pt={5}
          px={5}
        >
          <MainCard title="To Do 📝" />
          <MainCard title="In Progress ⏳" />
          <MainCard title="Completed ✅" />
        </Box>
      </Container>
    </div>
  );
};

export default CardContainer;
