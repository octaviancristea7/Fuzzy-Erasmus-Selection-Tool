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
      </DataTable>
    </TabPanel>
  </TabView>
</template>

<script setup>
import { ref } from "vue";

const isDeleteStudentDialog = ref(false);
const isAddStudent = ref(false);
const student = ref({});

//Hardcoded data - to be removed
const students = ref([
  {
    id: 1,
    name: "Student 1",
    firstSemester: 8.9,
    secondSemester: 9.4,
    foreignLanguage: 8.7,
  },
  {
    id: 2,
    name: "Student 2",
    firstSemester: 9.5,
    secondSemester: 9.5,
    foreignLanguage: 8,
  },
  {
    id: 3,
    name: "Student 3",
    firstSemester: 10,
    secondSemester: 7.5,
    foreignLanguage: 9,
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
</script>

<style>
.p-column-header-content {
  justify-content: center;
}

.danger-icon {
  color: #EA5455;
}
</style>
