import React from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Form, FormCard, FormTitle, Button, Label } from "./form-components";

export default function ReminderForm({ formTitle, submitText, onSubmit }) {
  const [date, setDate] = React.useState(new Date());

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(format(date, "MM-DD-YYYY"));
  };

  return (
    <FormCard>
      <FormTitle>{formTitle}</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="date">Pick a date for the reminder</Label>
        <DatePicker
          id="date"
          name="date"
          selected={date}
          onChange={date => setDate(date)}
        />
        <Button type="submit">{submitText}</Button>
      </Form>
    </FormCard>
  );
}
