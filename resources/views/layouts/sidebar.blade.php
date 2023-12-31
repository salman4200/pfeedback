<?php
use Illuminate\Support\Facades\Route;
$currentRouteName = Route::getCurrentRoute()->getName();

?>

<ul class="navbar-nav  sidebar sidebar-dark accordion" id="accordionSidebar" style="background:#722FF9;">
    <a class="sidebar-brand d-flex align-items-center justify-content-center">
        <div class="mt-4 sidebar-brand-text mx-3">Product Feedback Tool</div>
    </a>
    <hr class="sidebar-divider my-0">
    <li class="nav-item {{ str_contains($currentRouteName, 'users') ? 'active' : '' }}">
        <a class="nav-link" href="{{ route('admin.users') }}">
            <i class="fas fa-users"></i>
            <span style="color:white; font-size:18px;">Users</span></a>
    </li>
    <hr class="sidebar-divider d-none d-md-block">
    <li class="nav-item {{ str_contains($currentRouteName, 'stocks') ? 'active' : '' }}">
        <a class="nav-link"  href="{{ route('admin.feedbacks') }}">
            <i class="fas fa-users"></i>
            <span style="color:white; font-size:18px;" >User Feedbacks</span></a>
    </li>
    <hr class="sidebar-divider d-none d-md-block">
    <li class="nav-item {{ str_contains($currentRouteName, 'stocks') ? 'active' : '' }}">
        <a class="nav-link" href="{{ route('admin.settings') }}">
            <i class="fas fa-fw fa-cog"></i>
            <span style="color:white; font-size:18px;">Settings</span></a>
    </li>
    <hr class="sidebar-divider d-none d-md-block">
    <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>
</ul>
