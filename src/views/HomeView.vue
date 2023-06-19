<template>
  <TabView>
    <TabPanel header="Tabel note">
      <Toolbar class="mb-4">
        <template #start>
          <Button
            label="ADAUGĂ STUDENT"
            icon="pi pi-plus"
            severity="success"
            class="mr-2"
            @click="openNew"
          />
          <Button
            label="Calculare fuzzy"
            icon="pi pi-calculator"
            severity="info"
            class="mr-2"
            @click="getResult"
          />
        </template>
      </Toolbar>
      <DataTable
        :value="students"
        tableStyle="min-width: 50rem"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
      >
        <Column
          field="name"
          header="name student"
          bodyClass="text-center"
          sortable
        ></Column>
        <Column
          field="firstSemester"
          header="Medie semestrul I"
          bodyClass="text-center"
          sortable
        ></Column>
        <Column
          field="secondSemester"
          header="Medie semestrul II"
          bodyClass="text-center"
          sortable
        ></Column>
        <Column
          field="foreignLanguage"
          header="Notă limbă străină"
          bodyClass="text-center"
          sortable
        ></Column>
        <Column
          :exportable="false"
          style="min-width: 8rem"
          header="Acțiuni"
          bodyClass="text-center"
        >
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              class="mr-2"
              @click="editStudent"
            />
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteStudent(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
      <Dialog
        v-model:visible="isDeleteStudentDialog"
        :style="{ width: '450px' }"
        header="Confirmare"
        :modal="true"
      >
        <div class="confirmation-content">
          <i
            class="pi pi-exclamation-triangle mr-3 danger-icon"
            style="font-size: 2rem"
          ></i>
          <span v-if="student"
            >Ești sigur că vrei să ștergi studentul <b>{{ student.name }}</b
            >?</span
          >
        </div>

        <template #footer>
          <Button
            label="Nu"
            icon="pi pi-times"
            class="p-button-danger"
            text
            @click="isDeleteStudentDialog = false"
          />
          <Button label="Da" icon="pi pi-check" text @click="deleteStudent" />
        </template>
      </Dialog>
      <Dialog
        v-model:visible="isAddStudent"
        :style="{ width: '450px' }"
        header="Confirmare"
        :modal="true"
        class="p-fluid custom-dialog"
      >
        <div class="p-field">
          <label for="studentName">name student</label>
          <InputText id="studentName" v-model="newStudent.name" />
        </div>
        <div class="p-field">
          <label for="firstSemester">Medie semestrul 1</label>
          <InputText id="firstSemester" v-model="newStudent.firstSemester" />
        </div>
        <div class="p-field">
          <label for="secondSemester">Medie semestrul 2</label>
          <InputText id="secondSemester" v-model="newStudent.secondSemester" />
        </div>
        <div class="p-field">
          <label for="foreignLanguage">Notă limbă străină</label>
          <InputText
            id="foreignLanguage"
            v-model="newStudent.foreignLanguage"
          />
        </div>

        <template #footer>
          <div class="p-dialog-footer">
            <Button
              label="Anulează"
              icon="pi pi-times"
              @click="isAddStudent = false"
              class="p-button-secondary"
            />
            <Button
              label="Adaugă"
              icon="pi pi-check"
              class="p-button-success"
              @click="addStudent"
            />
          </div>
        </template>
      </Dialog>
    </TabPanel>
    <TabPanel header="Tabel fuzzy">
      <DataTable
        :value="fuzzyStudents"
        tableStyle="min-width: 50rem"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
      >
        <Column
          field="name"
          header="name student"
          bodyClass="text-center"
          sortable
        ></Column>
        <Column
          field="firstSemester"
          header="Medie semestrul I"
          bodyClass="text-center"
          sortable
        ></Column>
        <Column
          field="secondSemester"
          header="Medie semestrul II"
          bodyClass="text-center"
          sortable
        ></Column>
        <Column
          field="foreignLanguage"
          header="Notă limbă străină"
          bodyClass="text-center"
          sortable
        ></Column>
      </DataTable>
    </TabPanel>
  </TabView>

  <h2 v-if="erasmusStudents.length > 0">
    Rezultatul selecției studenților pentru programul Erasmus este:
    <span v-for="student in erasmusStudents"> {{ student }}, </span>
  </h2>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const isDeleteStudentDialog = ref(false);
const isAddStudent = ref(false);
const student = ref({});

//Hardcoded data - to be removed
const students = ref([
  {
    id: 1,
    name: "Student 1",
    firstSemester: 8.6,
    secondSemester: 9.1,
    foreignLanguage: 9.2,
  },
  {
    id: 2,
    name: "Student 2",
    firstSemester: 9.2,
    secondSemester: 8.8,
    foreignLanguage: 9.35,
  },
  {
    id: 3,
    name: "Student 3",
    firstSemester: 9.7,
    secondSemester: 9.2,
    foreignLanguage: 9.5,
  },
  {
    id: 4,
    name: "Student 4",
    firstSemester: 9.1,
    secondSemester: 7.8,
    foreignLanguage: 8.75,
  },
  {
    id: 5,
    name: "Student 5",
    firstSemester: 8.8,
    secondSemester: 9,
    foreignLanguage: 8.3,
  },
]);

const newStudent = ref({
  id: null,
  name: null,
  firstSemester: null,
  secondSemester: null,
  foreignLanguage: null,
});

//Student delete dialog opening
const confirmDeleteStudent = (stud) => {
  student.value = stud;
  isDeleteStudentDialog.value = true;
};

//Student delete function
const deleteStudent = () => {
  students.value = students.value.filter((val) => val.id !== student.value.id);
  isDeleteStudentDialog.value = false;
};

//Add new student dialog opening
const openNew = () => {
  isAddStudent.value = true;
};

//Add new student function - to be continued
const addStudent = () => {
  isAddStudent.value = false;
};

const editStudent = () => {
  console.log("Edit student TBE");
};

//To be continued
const findIndexById = (id) => {
  let index = -1;
  for (let i = 0; i < students.value.length; i++) {
    if (students.value[i].id === id) {
      index = i;
      break;
    }
  }
};

////////////////////////FUZZY DATA/////////////
const fuzzyStudents = ref([]); //Fuzzy Table Data
const erasmusStudents = ref([]); //Array with the eligible erasmus students
const nrErasmus = ref(2); //Number of erasmus students

//FUZZY FUNCTIONS

//FUZZY TRANSFORMATION LOGIC
const fuzzyTransform = () => {
  fuzzyStudents.value = students.value.map((student) => ({
    id: student.id,
    name: student.name,
    firstSemester: fuzzyFirst(student.firstSemester),
    secondSemester: fuzzySecond(student.secondSemester),
    foreignLanguage: fuzzyFL(student.foreignLanguage),
  }));
};

const fuzzyFirst = (number) => {
  if (number >= 0 && number < 8) {
    return 0;
  }
  if (number >= 8 && number < 9) {
    return Math.round((number - 8) * 10) / 10;
  }
  if (number >= 9 && number <= 10) {
    return 1;
  }
  return null;
};
const fuzzySecond = (number) => {
  if (number >= 0 && number < 7) {
    return 0;
  }
  if (number >= 7 && number < 9) {
    return Math.round(((number - 7) / 2) * 10) / 10;
  }
  if (number >= 9 && number <= 10) {
    return 1;
  }
  return null;
};
const fuzzyFL = (number) => {
  if (number >= 0 && number < 8) {
    return 0;
  }
  if (number >= 8 && number < 9.5) {
    return Math.round(((number - 8) / 1.5) * 10) / 10;
  }
  if (number >= 9.5 && number <= 10) {
    return 1;
  }
  return null;
};

//Transform the data for the fuzzy table
watch(students, () => {
  fuzzyTransform();
});
onMounted(() => {
  fuzzyTransform();
});

//Function that return an array with all the fuzzy sets
const returnAllResultArray = () => {
  //FIRST YEAR RESULTS ARRAY FOR EACH STUDENTS
  const rezultateBuneAn1 = fuzzyStudents.value.map(
    ({ name, firstSemester }) => ({
      name,
      firstSemester,
    })
  );
  //SECOND YEAR RESSULTS ARRAY FOR EACH STUDENTS
  const rezultateBuneAn2 = fuzzyStudents.value.map(
    ({ name, secondSemester }) => ({
      name,
      secondSemester,
    })
  );
  // LS RESULT ARRAY FOR EACH STUDENTS
  const rezultateBuneLS = fuzzyStudents.value.map(
    ({ name, foreignLanguage }) => ({
      name,
      foreignLanguage,
    })
  );
  //ARRAY OF ARRAYS
  return [rezultateBuneAn1, rezultateBuneAn2, rezultateBuneLS];
};
const getResult = () => {
  erasmusStudents.value = [];
  //Array with all the fuzzy sets
  const allArray = returnAllResultArray();

  //Membership function array
  const membershipArray = fuzzyStudents.value.map((student) => {
    const { name } = student;
    const lowestResult = Math.min(
      ...allArray.map((currentArray) => {
        return currentArray.find((x) => x.name === name)[
          Object.keys(currentArray[0])[1]
        ];
      })
    );
    return { name, lowestResult };
  });

  //sort membership array highest to lowest
  membershipArray.sort((a, b) => b.lowestResult - a.lowestResult);

  //populate erasmusStudents array with the number of erasmus students
  for (let i = 0; i < nrErasmus.value; i++) {
    erasmusStudents.value.push(membershipArray[i].name);
  }

  console.log(
    `fuzzyStudentsi caare pleaca in erasmus sunt ${erasmusStudents.value}`
  );
};
</script>

<style>
.p-column-header-content {
  justify-content: center;
}

.danger-icon {
  color: #ea5455;
}
</style>
