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
              @click="editStudent(slotProps.students)"
            />
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteStudent(slotProps.students)"
            />
          </template>
        </Column>
      </DataTable>
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
    <Dialog
      v-model:visible="deleteStudentDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="student"
          >Are you sure you want to delete <b>{{ student.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          text
          @click="deleteStudentDialog = true"
        />
        <Button label="Yes" icon="pi pi-check" text @click="deleteStudent" />
      </template>
    </Dialog>
  </TabView>
</template>

<script setup>
import { ref } from "vue";


const deleteStudentDialog = ref(false);
const student = ref({});
const students = ref([
  {
    name: "Student 1",
    firstSemester: 8.9,
    secondSemester: 9.4,
    foreignLanguage: 8.7,
  },
  {
    name: "Student 2",
    firstSemester: 9.5,
    secondSemester: 9.5,
    foreignLanguage: 8,
  },
  {
    name: "Student 3",
    firstSemester: 10,
    secondSemester: 7.5,
    foreignLanguage: 9,
  },
]);

const confirmDeleteStudent = () => {
  deleteStudentDialog.value = true;
  console.log("se intampla ceva");
};

const openNew = () => {
  console.log("OpenNew function TBE");
};
</script>

<style>
.p-column-header-content {
  justify-content: center;
}
</style>
