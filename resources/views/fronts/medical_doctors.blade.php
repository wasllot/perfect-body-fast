@extends('fronts.layouts.app')
@section('front-title')
    {{ __('messages.web.medical_doctors') }}
@endsection
@section('front-content')
    @php
        $styleCss = 'style';
    @endphp
    <div class="page-content bg-white">
        <!-- Inner Banner -->
        <div class="banner-wraper">
            <div class="page-banner">
            <div class="container">
                <div class="page-banner-entry text-center">
                    <h1>{{ __('messages.web.our_team') }}</h1>
                    <!-- Breadcrumb row -->
                    <nav aria-label="breadcrumb" class="breadcrumb-row">
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="{{ url('/') }}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                         stroke-linecap="round" stroke-linejoin="round"
                                         class="feather feather-home">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg>
                                    {{ __('messages.web.home') }}</a></li>
                            <li class="breadcrumb-item active"
                                aria-current="page">{{ __('messages.web.our_team') }}</li>
                        </ul>
                    </nav>
                </div>
            </div>
            
        </div>
        <!-- Breadcrumb row END -->
    </div>
        <!-- Inner Banner end -->

        <!-- Team -->
        <section class="section-area section-sp1 team-wraper">
            <div class="container">
                <div class="row justify-content-center">
                    @foreach($doctors as $doctor)
                        <div class="col-lg-4 col-sm-6 mb-30">
                            <div class="team-member h-100 d-flex flex-column p-20">
                                <div class="team-media">
                                    <img src="{{ $doctor->user->profile_image }}" class="object-cover" alt="">
                                </div>
                                <div class="team-info">
                                    <div class="team-info-comntent">
                                        <h4 class="title">{{ $doctor->user->full_name }}</h4>
                                        <span class="text-secondary">
                                            {{ $doctor->specializations->first()->name }}
                                        </span>
                                    </div>
                                    <ul class="social-media">
                                        @if(!empty($doctor->twitter_url))
                                            <li>
                                                <a target="_blank" href="{{ $doctor->twitter_url }}"><i
                                                            class="fab fa-twitter"></i></a>
                                            </li>
                                        @endif
                                        @if(!empty($doctor->linkedin_url))
                                            <li>
                                                <a target="_blank" href="{{ $doctor->linkedin_url }}"><i
                                                            class="fab fa-linkedin"></i></a>
                                            </li>
                                        @endif
                                        @if(!empty($doctor->instagram_url))
                                            <li>
                                                <a target="_blank" href="{{ $doctor->instagram_url }}"><i
                                                            class="fab fa-instagram"></i></a>
                                            </li>
                                        @endif
                                    </ul>
                                </div>
                                <div class="mt-auto">
                                    <a href="{{ route('doctorBookAppointment',$doctor->id) }}"
                                       class="btn btn-primary shadow d-xl-inline-block d-sm-flex d-inline-block align-items-center justify-content-between ps-sm-3 ps-2 py-1 pe-1">
                                        <span>{{ __('messages.web.book_an_appointment') }}</span>
                                        <i class="btn-icon-bx fas fa-chevron-right my-0 ms-1 me-0"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>

    </div>
@endsection
