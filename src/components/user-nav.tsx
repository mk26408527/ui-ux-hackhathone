"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function UserNav() {
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      if (response.ok) {
        localStorage.removeItem("isLoggedIn")
        toast({
          title: "Logged out",
          description: "You have been successfully logged out.",
        })
        router.push("/admin")
      } else {
        throw new Error("Logout failed")
      }
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out. Please try again.",
        variant: "destructive",
      })
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/dp.jpg" alt="@Furniture" />
            <AvatarFallback>MH</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">admin</p>
            <p className="text-xs leading-none text-muted-foreground">admin@gmail.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        <Link href="dashboard">  
        <DropdownMenuItem>
            Dashboard
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem></Link>
       <Link href="profile"> 
         <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem></Link>
       <Link href="orders">  
        <DropdownMenuItem>
            Orders
            <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
          </DropdownMenuItem></Link>
          <Link href="analytics">  
        <DropdownMenuItem>
            Analytics
            <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
          </DropdownMenuItem></Link>
          <Link href="customers">  
        <DropdownMenuItem>
            Customer
            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem></Link>
        <Link href="products">   
        <DropdownMenuItem>
        Products
        <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          </Link>
         <Link href="/settings"><DropdownMenuItem>Settings       
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem></Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

