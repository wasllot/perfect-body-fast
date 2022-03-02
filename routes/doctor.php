<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DoctorSessionController;
use App\Http\Controllers\GoogleCalendarController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VisitController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix'     => 'doctors', 'as' => 'doctors.',
              'middleware' => ['auth', 'xss', 'checkUserStatus', 'role:doctor'],
],
    function () {

        //doctor dashboard route 
        Route::get('/dashboard', [DashboardController::class, 'doctorDashboard'])->name('dashboard');
        Route::get('/doctor-dashboard',
            [DashboardController::class, 'getDoctorAppointment'])->name('appointment.dashboard');

        // Doctor Session Routes
        Route::resource('doctor-sessions', DoctorSessionController::class);
        Route::get('get-slot-by-gap', [DoctorSessionController::class, 'getSlotByGap'])->name('get.slot.by.gap');
        Route::get('doctor-schedule-edit',
            [DoctorSessionController::class, 'doctorScheduleEdit'])->name('doctor.schedule.edit');

        //Doctor Appointment route
        Route::get('appointments', [AppointmentController::class, 'doctorAppointment'])->name('appointments');
        Route::get('appointments-calendar',
            [AppointmentController::class, 'doctorAppointmentCalendar'])->name('appointments.calendar');
        Route::get('appointments/{appointment}',
            [AppointmentController::class, 'appointmentDetail'])->name('appointment.detail');

        //Visit route
        Route::resource('visits', VisitController::class);
        Route::post('add-problem', [VisitController::class, 'addProblem'])->name('visits.add.problem');
        Route::post('delete-problem/{problem}',
            [VisitController::class, 'deleteProblem'])->name('visits.delete.problem');
        Route::post('add-observation', [VisitController::class, 'addObservation'])->name('visits.add.observation');
        Route::post('delete-observation/{observation}',
            [VisitController::class, 'deleteObservation'])->name('visits.delete.observation');
        Route::post('add-note', [VisitController::class, 'addNote'])->name('visits.add.note');
        Route::post('delete-note/{note}', [VisitController::class, 'deleteNote'])->name('visits.delete.note');
        Route::post('add-prescription', [VisitController::class, 'addPrescription'])->name('visits.add.prescription');
        Route::post('delete-prescription/{prescription}',
            [VisitController::class, 'deletePrescription'])->name('visits.delete.prescription');
        Route::get('edit-prescription/{prescription}',
            [VisitController::class, 'editPrescription'])->name('visits.edit.prescription');

        Route::post('appointments/{appointment}',
            [AppointmentController::class, 'changeStatus'])->name('change-status');
        Route::post('appointments-payment/{id}',
            [AppointmentController::class, 'changePaymentStatus'])->name('change-payment-status');
        Route::get('patients/{patient}', [PatientController::class, 'show'])->name('patient.detail');
        Route::get('patient-appointments',
            [PatientController::class, 'patientAppointment'])->name('patients.appointment');
        Route::get('appointments/{appointment}',
            [AppointmentController::class, 'show'])->name('appointment.detail');
        Route::get('doctors/{doctor}', [UserController::class, 'show'])->name('doctors.detail');
        Route::get('doctors-appointment',
            [UserController::class, 'doctorAppointment'])->name('doctors.appointment');
        
        Route::get('connect-google-calendar',[GoogleCalendarController::class,'googleCalendar'])->name('googleCalendar.index');
        Route::get('disconnect-google-calendar',[GoogleCalendarController::class,'disconnectGoogleCalendar'])->name('disconnectCalendar.destroy');
        Route::post('appointment-google-calendar',[GoogleCalendarController::class,'appointmentGoogleCalendarStore'])->name('appointmentGoogleCalendar.store');
    });
