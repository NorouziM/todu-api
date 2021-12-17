import { Router } from "express";

const router = Router();

router.get("/:id", (req, res) => {
  res.status("203").send(req.params.id);
});

router.get("/", (req, res) => {
  res.status("200").json({
    data: "some",
  });
});

export default router;
