@extends('layouts.app')
@section('title')
    {{ __('messages.sliders') }}
@endsection
@section('page_css')
    <link href="{{ mix('assets/css/app.css') }}" rel="stylesheet" type="text/css"/>
@endsection
@section('content')
    <div class="container">
        @include('flash::message')
    </div>
    <div id="kt_content_container" class="container">
        <div class="card">
{{--            <div class="card-header d-flex border-0 pt-6">--}}
{{--                @include('layouts.search-component')--}}
{{--                <div class="card-toolbar ms-auto">--}}
{{--                    <div class="d-flex justify-content-end" data-kt-user-table-toolbar="base">--}}
{{--                        <a type="button" class="btn btn-primary" href="{{ route('sliders.create')}}">--}}
{{--                                <span class="svg-icon svg-icon-2">--}}
{{--                                    <svg xmlns="http://www.w3.org/2000/svg"--}}
{{--                                         xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"--}}
{{--                                         height="24px" viewBox="0 0 24 24" version="1.1">--}}
{{--                                        <rect fill="#000000" x="4" y="11" width="16" height="2" rx="1"/>--}}
{{--                                        <rect fill="#000000" opacity="0.5"--}}
{{--                                              transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000)"--}}
{{--                                              x="4" y="11" width="16" height="2" rx="1"/>--}}
{{--                                    </svg>--}}
{{--                                </span>--}}
{{--                            {{ __('messages.slider.add_slider') }}</a>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--            </div>--}}
            <div class="card-body pt-0">
                @include('fronts.sliders.table')
            </div>
        </div>
    </div>
    @include('layouts.templates.actions')
@endsection
@section('scripts')
    <script src="{{ mix('assets/js/custom/custom-datatable.js') }}"></script>
    <script src="{{ mix('assets/js/fronts/sliders/slider.js') }}"></script>
@endsection
