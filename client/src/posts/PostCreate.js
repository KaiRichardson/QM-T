import * as React from "react";
import { useMemo } from "react";
import "./style.css";
import RichTextInput from "ra-input-rich-text";
import {
  ArrayInput,
  AutocompleteInput,
  BooleanInput,
  Create,
  DateInput,
  FormDataConsumer,
  RadioButtonGroupInput,
  ReferenceInput,
  SaveButton,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  Toolbar,
  required,
} from "react-admin"; // eslint-disable-line import/no-unresolved

const PostCreateToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton
      label="post.action.save_and_edit"
      redirect="edit"
      submitOnEnter={true}
    />
    <SaveButton
      label="post.action.save_and_show"
      redirect="show"
      submitOnEnter={false}
      variant="text"
    />
    <SaveButton
      label="post.action.save_and_add"
      redirect={false}
      submitOnEnter={false}
      variant="text"
    />
    <SaveButton
      label="post.action.save_with_average_note"
      transform={(data) => ({ ...data, average_note: 10 })}
      redirect="show"
      submitOnEnter={false}
      variant="text"
    />
  </Toolbar>
);

const backlinksDefaultValue = [
  {
    date: new Date(),
    url: "http://google.com",
  },
];
const PostCreate = ({ permissions, ...props }) => {
  const initialValues = useMemo(
    () => ({
      average_note: 0,
    }),
    []
  );

  const dateDefaultValue = useMemo(() => new Date(), []);

  return (
    <Create {...props}>
      <SimpleForm
        toolbar={<PostCreateToolbar />}
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          ["ticket"].forEach((field) => {
            if (!values[field]) {
              errors[field] = "Required field";
            }
          });

          return errors;
        }}
      >
        <TextInput autoFocus source="ticket" />
        <h4>Message Relevance</h4>
        <div>
        <RadioButtonGroupInput
 n          source="does the agent's response address the user's direct questions and concerns?"
          choices={[
            { id: "yes", name: "Yes" },
            { id: "no", name: "No" },
            { id: "na", name: "N/A" },
          ]}
          />
        <RadioButtonGroupInput
          source="does the agent's response address the user's direct questions and concerns?"
          choices={[
            { id: "yes", name: "Yes" },
            { id: "no", name: "No" },
            { id: "na", name: "N/A" },
          ]}
          />
          </div>
        <BooleanInput source="undocumented" defaultValue />
        <RichTextInput source="note" validate={required()} />
        {/* <FormSpy subscription={{ values: true }}>
          {({ values }) =>
            values.ticket ? <NumberInput source="average_note" /> : null
          }
        </FormSpy> */}

        <DateInput source="published_at" defaultValue={dateDefaultValue} />
        <ArrayInput
          source="backlinks"
          defaultValue={backlinksDefaultValue}
          validate={[required()]}
        >
          <SimpleFormIterator>
            <DateInput source="date" />
            <TextInput source="url" />
          </SimpleFormIterator>
        </ArrayInput>
        {permissions === "admin" && (
          <ArrayInput source="authors">
            <SimpleFormIterator>
              <ReferenceInput label="User" source="user_id" reference="users">
                <AutocompleteInput />
              </ReferenceInput>
              <FormDataConsumer>
                {({ formData, scopedFormData, getSource, ...rest }) =>
                  scopedFormData && scopedFormData.user_id ? (
                    <SelectInput
                      label="Role"
                      source={getSource("role")}
                      choices={[
                        {
                          id: "headwriter",
                          name: "Head Writer",
                        },
                        {
                          id: "proofreader",
                          name: "Proof reader",
                        },
                        {
                          id: "cowriter",
                          name: "Co-Writer",
                        },
                      ]}
                      {...rest}
                    />
                  ) : null
                }
              </FormDataConsumer>
            </SimpleFormIterator>
          </ArrayInput>
        )}
      </SimpleForm>
    </Create>
  );
};

export default PostCreate;
