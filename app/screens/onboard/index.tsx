import React, { useState, useRef } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import styles from "../../styles";
import DatePick from "../../components/DatePick";
import moment from "moment";
import { Formik, ErrorMessage } from "formik";

type OnboardProp = {
  name: string;
  email: string;
  dob: string;
};
const Onboard = () => {
  const [showDate, setShowDate] = useState(false);
  const [data, setDate] = useState<string | undefined>(undefined);

  const validate = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    emial: Yup.string().email(),
    dof: Yup.string().required("DOB is required"),
  });

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
      }}
    >
      <PagerView style={styles.baseStyle.viewPager} initialPage={0}>
        <Formik
          initialValues={{ name: "", email: "", date: "" }}
          onSubmit={() => console.log("submit")}
          validationSchema={validate}
        >
          {({ handleSubmit, values }) => (
            <View style={styles.baseStyle.viewPage} key="1">
              <View style={{ alignItems: "center", paddingBottom: 20 }}>
                <Text style={styles.baseStyle.baseTitle}>On boarding</Text>
              </View>
              <Text style={styles.baseStyle.baseText}>Full Name</Text>
              <TextInput
                style={styles.baseStyle.baseTextInput}
                keyboardType="default"
                placeholder="Please enter your first and last names"
                placeholderTextColor="gray"
                value={values.name}
              />
              <ErrorMessage />
              <Text style={styles.baseStyle.baseText}>Email</Text>
              <TextInput
                style={styles.baseStyle.baseTextInput}
                keyboardType="email-address"
                placeholder="Please enter your email address..."
                placeholderTextColor="gray"
                value={values.email}
              />
              <Text style={styles.baseStyle.baseText}>DOB</Text>
              <TouchableOpacity
                onPress={() => setShowDate(!showDate)}
                style={styles.baseStyle.dataPick}
              >
                <Text style={styles.baseStyle.dataText}>{`${
                  moment(data).format("DD/MM/YYYY") ||
                  "Please enter the specific date..."
                }`}</Text>
              </TouchableOpacity>
              <DatePick
                show={showDate}
                handleCloseDate={() => {
                  setShowDate(false);
                }}
                handleDateChange={(value: Date) => {
                  setDate(value.toUTCString());
                  setShowDate(false);
                }}
              />
              <Button
                title="Submit"
                style={styles.baseStyle.baseButton}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </PagerView>
    </View>
  );
};

export default Onboard;
