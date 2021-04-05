from .models import Booking


# To do 
# filter the Booking by user entered date
# then filter it using slot user demanded
# if free book the slot and return true else False


def check_free_slot(date, slot):
    objs = Booking.objects.filter()
    pass