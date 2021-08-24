import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mealsActions } from "../redux/actions/meals.actions";
import { withNamespaces } from "react-i18next";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";

const HomePage = ({ t }) => {
  // COMMON
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.meals.meals);
  const loading = useSelector((state) => state.meals.loading);
  const [currentID, setCurrentID] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [currentCount, setCurrentCount] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [firstStep, setFirstStep] = useState(true);

  // CREATE
  const [showCreate, setShowCreate] = useState(false);

  const createMeal = () => {
    dispatch(mealsActions.createMeal(currentInput));
    setShowCreate(false);
    setFirstStep(true);
  };

  // UPDATE
  const [showUpdate, setShowUpdate] = useState(false);

  const updateMeal = () => {
    dispatch(mealsActions.updateMeal(currentID, currentInput));
    setShowUpdate(false);
    setFirstStep(true);
  };

  // DELETE
  const [showDelete, setShowDelete] = useState(false);

  const deleteMeal = () => {
    dispatch(mealsActions.deleteMeal(currentID));
    setShowDelete(false);
  };

  return (
    <div id="home">
      <Container className="text-end mb-2">
        <Button
          variant="outline-primary"
          style={{ minWidth: "100px" }}
          onClick={() => setShowCreate(true)}
          disabled={loading}
        >
          {loading ? (
            <Spinner animation="border" variant="primary" size="sm" />
          ) : (
            t("Add New")
          )}
        </Button>
      </Container>
      <Container className="overflow-auto">
        <Table striped bordered>
          <thead className="bg-secondary text-light">
            <tr className="text-center">
              <th>{t("No")}</th>
              <th>{t("Meal")}</th>
              <th>{t("Count")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {meals.length ? (
              meals.map((meal, idx) => (
                <tr className="text-center" key={meal.id}>
                  <td>{idx + 1}</td>
                  <td>{meal.name}</td>
                  <td>{meal.count}</td>
                  <td>
                    <button
                      onClick={() => {
                        setShowUpdate(true);
                        setCurrentID(meal.id);
                        setCurrentName(meal.name);
                        setCurrentInput(meal.name);
                        setCurrentCount(meal.count);
                      }}
                    >
                      {t("Edit")}
                    </button>
                    <button
                      onClick={() => {
                        setShowDelete(true);
                        setCurrentID(meal.id);
                        setCurrentName(meal.name);
                        setCurrentCount(meal.count);
                      }}
                    >
                      {t("Delete")}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan="4" className="py-3">
                  {t("Click 'Add New' to create new dishes!")}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>

      {/* CREATE */}
      <Modal
        centered
        show={showCreate}
        onHide={() => {
          setShowCreate(false);
          setFirstStep(true);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("Add New")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              createMeal();
            }}
          >
            <Form.Label>{t("Input the meal name will count")}</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder={t("Meal Name")}
              onChange={(e) => {
                setCurrentInput(e.target.value);
                setFirstStep(false);
              }}
              isInvalid={currentInput || firstStep ? false : true}
            />
            <Form.Control.Feedback type="invalid">
              {t("The meal's name cannot be empty!")}
            </Form.Control.Feedback>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={createMeal} disabled={currentInput ? false : true}>
            {t("Add")}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* UPDATE */}
      <Modal
        centered
        show={showUpdate}
        onHide={() => {
          setShowUpdate(false);
          setFirstStep(true);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("Edit Meal")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              updateMeal();
            }}
          >
            <Form.Control
              required
              type="text"
              placeholder={t("Meal Name")}
              onChange={(e) => {
                setCurrentInput(e.target.value);
                setFirstStep(false);
              }}
              value={currentInput}
              isInvalid={
                (currentInput && currentInput !== currentName) || firstStep
                  ? false
                  : true
              }
            />
            <Form.Text>
              {t("The count is")} {currentCount}
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {t(
                "The meal's name cannot be empty or the same as the previous one!"
              )}
            </Form.Control.Feedback>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={updateMeal}
            disabled={
              currentInput && currentInput !== currentName ? false : true
            }
          >
            {t("Update")}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* DELETE */}
      <Modal centered show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Delete")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {t("Are you want to delete")} "{currentName}" {t("with the count is")}{" "}
          {currentCount}?
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={deleteMeal}>{t("Delete")}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default withNamespaces()(HomePage);
