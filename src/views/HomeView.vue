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
            label="CALCULARE FUZZY"
            icon="pi pi-calculator"
            severity="info"
            class="mr-2"
            @click="
              getResult();
              isResultVisibile = true;
            "
          />
        </template>
        <template #end>
          <Button
            label="DOCUMENTAȚIE"
            icon="pi pi-book"
            severity="help"
            class="mr-2"
            @click="getDocumentation"
        /></template>
      </Toolbar>
      <div
        id="tableAndCardWrapper"
        class="flex align-items-start justify-content-between mr-8"
      >
        <div
          style="width: 70%"
          id="tableWrapper"
          class="flex flex-column justify-content-between align-items-center"
        >
          <DataTable
            style="width: 100%"
            :value="students"
            tableStyle="min-width: 50rem"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
          >
            <Column
              field="name"
              header="Nume student"
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
          <Card style="width: 100%" v-if="isResultVisibile">
            <template #title> Rezultat </template>
            <template #content>
              <h3>
                Rezultatul selecției studenților pentru programul Erasmus este:
                <span v-for="student in erasmusStudents"> {{ student }}, </span>
              </h3>
            </template>
          </Card>
        </div>
        <div id="cardWrappers" class="flex flex-column">
          <Card class="m-1 p-0" style="width: 25em; height: 25%">
            <template #title> Semestrul I </template>
            <template #subtitle> Funcție apartenență </template>
            <template #content>
              <p>
                0, 0≤X≤<InputText
                  class="p-1 m-1"
                  style="width: 3rem"
                  v-model="functionParams.stFunctionLow"
                />
              </p>
              <p>
                X-{{ functionParams.stFunctionLow }},
                <InputText
                  class="p-1 m-1"
                  style="width: 3rem"
                  v-model="functionParams.stFunctionLow"
                />≤X≤<InputText
                  class="p-1 m-1"
                  style="width: 3rem"
                  v-model="functionParams.stFunctionMedium"
                />
              </p>
              <p>
                1,
                <InputText
                  class="p-1 m-1"
                  style="width: 3rem"
                  v-model="functionParams.stFunctionMedium"
                />≤X≤<InputText
                  class="p-1 m-1"
                  style="width: 3rem"
                  v-model="functionParams.stFunctionHigh"
                />
              </p>
            </template>
          </Card>
          <Card class="m-1 p-0" style="width: 25em">
            <template #title> Semestrul II </template>
            <template #subtitle> Funcție apartenență </template>
            <template #content>
              <p>
                0, 0≤X≤<InputText
                  class="p-1 m-1"
                  style="width: 3rem"
                  v-model="functionParams.secondFunctionLow"
                />
              </p>
              <p>
                (X-{{ functionParams.secondFunctionLow }})/2,
                <InputText
                  class="p-1 m-1"
                  style="width: 3rem"
                  v-model="functionParams.secondFunctionLow"
                />≤X≤<InputText
                  class="p-1 m-1"
                  style="width: 3rem"
                  v-model="functionParams.secondFunctionMedium"
                />
              </p>
              <p>
                1,
                <InputText
                  class="p-1 m-1"
                  style="width: 3rem"
                  v-model="functionParams.secondFunctionMedium"
                />≤X≤<InputText
                  class="p-1 m-1"
                  style="width: 3rem"
                  v-model="functionParams.secondFunctionHigh"
                />
              </p>
            </template>
          </Card>
          <Card class="m-1 p-0" style="width: 25em">
            <template #title> Limbă străină </template>
            <template #subtitle> Funcție apartenență </template>
            <template #content>
              <p>
                0, 0≤X≤<InputText
                  class="p-1 m-1"
                  style="width: 3rem"
                  v-model="functionParams.flFunctionLow"
                />
              </p>
              <p>
                (X-{{ functionParams.flFunctionLow }})/1.5,
                <InputText
                  class="p-1 m-1"
                  style="width: 3rem"
                  v-model="functionParams.flFunctionLow"
                />≤X≤<InputText
                  class="p-1 m-1"
                  style="width: 3rem"
                  v-model="functionParams.flFunctionMedium"
                />
              </p>
              <p>
                1,
                <InputText
                  class="p-1 m-1"
                  style="width: 3rem"
                  v-model="functionParams.flFunctionMedium"
                />≤X≤<InputText
                  class="p-1 m-1"
                  style="width: 3rem"
                  v-model="functionParams.flFunctionHigh"
                />
              </p>
            </template>
          </Card>
        </div>
      </div>
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
          <label for="studentName">Nume student</label>
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
          header="Nume student"
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
      <Card style="width: 100%" v-if="isResultVisibile">
        <template #title> Rezultat </template>
        <template #content>
          <h3>
            Rezultatul selecției studenților pentru programul Erasmus este:
            <span v-for="student in erasmusStudents"> {{ student }}, </span>
          </h3>
        </template>
      </Card>
    </TabPanel>
  </TabView>
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

const isResultVisibile = ref(false);

//BOUNDS FOR MEMBERSHIP FUNCTIONS

const functionParams = ref({
  stFunctionLow: 8,
  stFunctionMedium: 9,
  stFunctionHigh: 10,

  secondFunctionLow: 7,
  secondFunctionMedium: 9,
  secondFunctionHigh: 10,

  flFunctionLow: 8,
  flFunctionMedium: 9.5,
  flFunctionHigh: 10,
});

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
  if (number >= 0 && number < functionParams.value.stFunctionLow) {
    return 0;
  }
  if (
    number >= functionParams.value.stFunctionLow.value &&
    number < functionParams.value.stFunctionMedium
  ) {
    return Math.round((number - 8) * 10) / 10;
  }
  if (
    number >= functionParams.value.stFunctionMedium &&
    number <= functionParams.value.stFunctionHigh
  ) {
    return 1;
  }
  return null;
};
const fuzzySecond = (number) => {
  if (number >= 0 && number < functionParams.value.secondFunctionLow) {
    return 0;
  }
  if (
    number >= functionParams.value.secondFunctionLow &&
    number < functionParams.value.secondFunctionMedium
  ) {
    return Math.round(((number - 7) / 2) * 10) / 10;
  }
  if (
    number >= functionParams.value.secondFunctionMedium &&
    number <= functionParams.value.secondFunctionHigh
  ) {
    return 1;
  }
  return null;
};
const fuzzyFL = (number) => {
  if (number >= 0 && number < functionParams.value.flFunctionLow) {
    return 0;
  }
  if (
    number >= functionParams.value.flFunctionLow &&
    number < functionParams.value.flFunctionMedium
  ) {
    return Math.round(((number - 8) / 1.5) * 10) / 10;
  }
  if (
    number >= functionParams.value.flFunctionMedium &&
    number <= functionParams.value.flFunctionHigh
  ) {
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
};

//DOCUMENTATION (router or pdf)
const getDocumentation = () => {
  console.log("documentatie");
};

//watchers for each change
watch(students, () => {
  getResult();
});
watch(functionParams.value, () => {
  getResult();
});
</script>

<style scoped>
.p-column-header-content {
  justify-content: center;
}

.danger-icon {
  color: #ea5455;
}
</style>
