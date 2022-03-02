@extends('fronts.layouts.app')
@section('front-title')
    {{ __('messages.web.medical_services') }}
@endsection
@section('front-content')
    @php
        $styleCss = 'style';
    @endphp
    <div class="page-content bg-white">
        <div class="banner-wraper">
            <div class="page-banner">
            <div class="container">
                <div class="page-banner-entry text-center">
                    <h1>{{ __('messages.web.services') }}</h1>
                    <!-- Breadcrumb row -->
                    <nav aria-label="breadcrumb" class="breadcrumb-row">
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="{{ route('medical') }}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round" class="feather feather-home">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg> {{ __('messages.web.home') }}</a></li>
                            <li class="breadcrumb-item active"
                                aria-current="page">{{ __('messages.web.services') }}</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <!-- Breadcrumb row END -->
    </div>
    <!-- Inner Banner end -->

    <!-- Categories -->
    <section class="section-area section-sp1">
        <div class="container">
            <div class="row justify-content-center">
                @foreach($serviceCategories as $serviceCategory)
                    <div class="col-lg-4 col-md-6 mb-30">
                        <div class="feature-container feature-bx2 feature1 h-100 d-flex flex-column">
                            <div class="icon-content mb-3">
                                <h3 class="ttr-title">{{ $serviceCategory->name }}</h3>
                            </div>
                            <div class="mt-auto">
                                <li class="btn-area">
                                    <a href="{{ route('servicesCategory',$serviceCategory->id) }}"
                                       class="btn btn-primary shadow d-xl-inline-block d-md-flex d-inline-block align-items-center justify-content-between ps-2 py-1 pe-1">
                                        <span>{{ __('messages.web.service_category') }}</span>
                                        <i class="btn-icon-bx fas fa-chevron-right my-0 ms-1 me-0"></i>
                                    </a>
                                </li>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>


    <!-- Serviceus-->
    <section class="section-sp1 service-wraper2">
        <div class="container">
            <div class="row">
                <div class="col-xl-3 col-sm-6 mb-30">
                    <div class="feature-container feature-bx3">
                        <h2 class="counter text-secondary">{{ $data['specializationsCount'] }}</h2>
                        <h5 class="ttr-title text-primary">{{ __('messages.specializations') }}</h5>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 mb-30">
                    <div class="feature-container feature-bx3">
                        <h2 class="counter text-secondary">{{ $data['servicesCount'] }}</h2>
                        <h5 class="ttr-title text-primary">{{ __('messages.web.services') }}</h5>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 mb-30">
                    <div class="feature-container feature-bx3">
                        <h2 class="counter text-secondary">{{ $data['doctorsCount'] }}</h2>
                        <h5 class="ttr-title text-primary">{{ __('messages.doctors') }}</h5>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 mb-30">
                    <div class="feature-container feature-bx3">
                        <h2 class="counter text-secondary">{{ $data['patientsCount'] }}</h2>
                        <h5 class="ttr-title text-primary">{{ __('messages.web.satisfied_patient') }}</h5>
                    </div>
                </div>
            </div>
        </div>
    </section>

    </div>

@endsection
@section('front-js')
    <script src="{{ asset('assets/front/vendor/counter/counterup.min.js') }}"></script>
    <script src="{{ asset('assets/front/vendor/counter/waypoints-min.js') }}"></script>
@endsection
