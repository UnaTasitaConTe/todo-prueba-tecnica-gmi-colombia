<?php

namespace App\DTOS;

class UserDTO
{
    public $userId;
    public $name;
    public $email;
    public $createdAt;
    public $updatedAt;

    public function __construct($user)
    {
        $this->userId = $user->id;
        $this->name = $user->name; 
        $this->email = $user->email;
        $this->createdAt = $user->created_at;
        $this->updatedAt = $user->updated_at;
    }
}
